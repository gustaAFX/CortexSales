from sqlalchemy.orm import Session

from app.models.branding import Branding
from app.schemas.branding_schema import BrandingUpsert


def get_branding(db: Session) -> Branding | None:
    return db.query(Branding).order_by(Branding.id.asc()).first()


def upsert_branding(db: Session, payload: BrandingUpsert) -> Branding:
    branding = get_branding(db)
    if branding is None:
        branding = Branding(**payload.model_dump())
        db.add(branding)
    else:
        for key, value in payload.model_dump().items():
            setattr(branding, key, value)

    db.commit()
    db.refresh(branding)
    return branding
