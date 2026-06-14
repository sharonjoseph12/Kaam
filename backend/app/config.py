"""Application configuration via environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/kaam"

    # JWT Auth
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    # Environment
    ENVIRONMENT: str = "development"

    # Karnataka minimum wages (INR/day) by worker category
    # Source: Karnataka Labour Dept, effective 2025
    MIN_WAGE_MAP: dict[str, dict[str, float]] = {
        "karnataka": {
            "mason": 693.0,
            "helper": 573.0,
            "carpenter": 693.0,
            "electrician": 693.0,
            "painter": 633.0,
            "plumber": 693.0,
            "other": 573.0,
        },
    }

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
