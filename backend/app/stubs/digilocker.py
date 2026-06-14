"""DigiLocker API stub.

Logs uploads instead of calling DigiLocker. Replace with actual
DigiLocker API integration for production.
"""

import logging

logger = logging.getLogger(__name__)


def upload_document(worker_kaam_id: str, document_type: str, pdf_content: bytes) -> str:
    """Upload a document to worker's DigiLocker.

    Returns a mock DigiLocker document reference ID.
    """
    doc_ref = f"DL-{worker_kaam_id}-{document_type}-MOCK"
    logger.info(
        "[DigiLocker STUB] Upload: worker=%s, type=%s, size=%d bytes, ref=%s",
        worker_kaam_id,
        document_type,
        len(pdf_content),
        doc_ref,
    )
    return doc_ref


def upload_wage_slip(worker_kaam_id: str, slip_kaam_id: str) -> str:
    """Upload wage slip PDF to worker's DigiLocker."""
    doc_ref = f"DL-{slip_kaam_id}-WAGE-SLIP"
    logger.info(
        "[DigiLocker STUB] Wage slip upload: worker=%s, slip=%s, ref=%s",
        worker_kaam_id,
        slip_kaam_id,
        doc_ref,
    )
    return doc_ref


def upload_merkle_certificate(contractor_kaam_id: str, date_str: str, root_hash: str) -> str:
    """Upload daily Merkle audit certificate to DigiLocker."""
    doc_ref = f"DL-{contractor_kaam_id}-MERKLE-{date_str}"
    logger.info(
        "[DigiLocker STUB] Merkle cert upload: contractor=%s, date=%s, hash=%s, ref=%s",
        contractor_kaam_id,
        date_str,
        root_hash[:16],
        doc_ref,
    )
    return doc_ref
