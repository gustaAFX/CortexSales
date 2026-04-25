from sqlalchemy.orm import Session

from app.schemas.branding_schema import BrandingRead, BrandingUpsert
from app.services.branding_service import get_branding_service, upsert_branding_service


def get_branding_controller(db: Session) -> BrandingRead:
    return get_branding_service(db)


def upsert_branding_controller(db: Session, payload: BrandingUpsert) -> BrandingRead:
    return upsert_branding_service(db, payload)
