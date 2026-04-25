from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.product_repository import (
    create_product,
    delete_product,
    get_product,
    list_products,
    update_product,
)
from app.schemas.product_schema import ProductCreate, ProductRead, ProductUpdate


def create_product_service(db: Session, payload: ProductCreate) -> ProductRead:
    return ProductRead.model_validate(create_product(db, payload))


def list_products_service(db: Session) -> list[ProductRead]:
    return [ProductRead.model_validate(item) for item in list_products(db)]


def get_product_service(db: Session, product_id: int) -> ProductRead:
    product = get_product(db, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return ProductRead.model_validate(product)


def update_product_service(db: Session, product_id: int, payload: ProductUpdate) -> ProductRead:
    product = get_product(db, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return ProductRead.model_validate(update_product(db, product, payload))


def delete_product_service(db: Session, product_id: int) -> None:
    product = get_product(db, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    delete_product(db, product)
