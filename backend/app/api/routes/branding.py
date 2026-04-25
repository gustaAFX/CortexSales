from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.controllers.branding_controller import (
    get_branding_controller,
    upsert_branding_controller,
)
from app.database.session import get_db
from app.schemas.branding_schema import BrandingRead, BrandingUpsert

router = APIRouter(tags=["branding"])


@router.get("/branding", response_model=BrandingRead)
def get_branding(db: Session = Depends(get_db)) -> BrandingRead:
    return get_branding_controller(db)


@router.put("/branding", response_model=BrandingRead)
def upsert_branding(payload: BrandingUpsert, db: Session = Depends(get_db)) -> BrandingRead:
    return upsert_branding_controller(db, payload)
