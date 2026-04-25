from sqlalchemy.orm import Session

from app.schemas.product_schema import ProductCreate, ProductRead, ProductUpdate
from app.services.product_service import (
    create_product_service,
    delete_product_service,
    get_product_service,
    list_products_service,
    update_product_service,
)


def create_product_controller(db: Session, payload: ProductCreate) -> ProductRead:
    return create_product_service(db, payload)


def list_products_controller(db: Session) -> list[ProductRead]:
    return list_products_service(db)


def get_product_controller(db: Session, product_id: int) -> ProductRead:
    return get_product_service(db, product_id)


def update_product_controller(db: Session, product_id: int, payload: ProductUpdate) -> ProductRead:
    return update_product_service(db, product_id, payload)


def delete_product_controller(db: Session, product_id: int) -> None:
    delete_product_service(db, product_id)
