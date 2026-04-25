from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.branding_repository import get_branding, upsert_branding
from app.schemas.branding_schema import BrandingRead, BrandingUpsert


def get_branding_service(db: Session) -> BrandingRead:
    branding = get_branding(db)
    if branding is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Branding not found")
    return BrandingRead.model_validate(branding)


def upsert_branding_service(db: Session, payload: BrandingUpsert) -> BrandingRead:
    return BrandingRead.model_validate(upsert_branding(db, payload))
