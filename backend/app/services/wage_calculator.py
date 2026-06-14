"""Wage slip calculation engine.

Implements the Labour Code compliant wage calculation:
- Gross = (Days Present + 0.5×Half Days + 1.5×Overtime) × Daily Rate
- Overtime rate = 2× daily rate (Labour Code mandate)
- Minimum wage check against state rates
- Deductions: advance recovery, insurance premium (₹2/day × days present)
"""

from dataclasses import dataclass, field

from app.config import settings


@dataclass
class WageCalculation:
    """Result of wage calculation for a single worker's cycle."""

    days_present: int = 0
    half_days: int = 0
    overtime_days: int = 0
    absent_days: int = 0
    daily_rate: float = 0.0
    basic_wages: float = 0.0
    overtime_wages: float = 0.0
    gross: float = 0.0
    deductions: dict[str, float] = field(default_factory=dict)
    total_deductions: float = 0.0
    net: float = 0.0
    min_wage_violation: bool = False
    min_wage_shortfall: float = 0.0


def calculate_wages(
    days_present: int,
    half_days: int,
    overtime_days: int,
    absent_days: int,
    daily_rate: float,
    state: str = "karnataka",
    category: str = "other",
    active_loan_repayment: float = 0.0,
    insurance_enrolled: bool = False,
) -> WageCalculation:
    """Calculate wages for a single worker's pay cycle.

    Labour Code rules:
    - Overtime rate = 2× basic daily rate
    - Half day = 0.5× basic daily rate
    - Minimum wage must be met or slip is flagged
    """
    result = WageCalculation(
        days_present=days_present,
        half_days=half_days,
        overtime_days=overtime_days,
        absent_days=absent_days,
        daily_rate=daily_rate,
    )

    # Basic wages
    payable_days = days_present + (half_days * 0.5)
    result.basic_wages = payable_days * daily_rate

    # Overtime at 2× rate (Labour Code mandate)
    result.overtime_wages = overtime_days * (daily_rate * 2)

    # Gross
    result.gross = result.basic_wages + result.overtime_wages

    # Deductions
    deductions: dict[str, float] = {}

    if active_loan_repayment > 0:
        deductions["loan_repayment"] = active_loan_repayment

    if insurance_enrolled:
        insurance_premium = 2.0 * days_present  # ₹2/day for days present
        deductions["insurance_premium"] = insurance_premium

    result.deductions = deductions
    result.total_deductions = sum(deductions.values())
    result.net = result.gross - result.total_deductions

    # Minimum wage check
    state_lower = state.lower()
    category_lower = category.lower()
    min_wage_map = settings.MIN_WAGE_MAP
    if state_lower in min_wage_map:
        state_wages = min_wage_map[state_lower]
        min_wage = state_wages.get(category_lower, state_wages.get("other", 0))
        total_working_days = days_present + (half_days * 0.5) + overtime_days
        if total_working_days > 0:
            effective_daily_rate = result.gross / total_working_days
            if effective_daily_rate < min_wage:
                result.min_wage_violation = True
                result.min_wage_shortfall = (min_wage - effective_daily_rate) * total_working_days

    return result
