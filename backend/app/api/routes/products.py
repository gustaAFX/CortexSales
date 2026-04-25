from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.controllers.product_controller import (
    create_product_controller,
    delete_product_controller,
    get_product_controller,
    list_products_controller,
    update_product_controller,
)
from app.database.session import get_db
from app.schemas.product_schema import ProductCreate, ProductRead, ProductUpdate

router = APIRouter(prefix="/products", tags=["products"])


@router.post("", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)) -> ProductRead:
    return create_product_controller(db, payload)


@router.get("", response_model=list[ProductRead])
def list_products(db: Session = Depends(get_db)) -> list[ProductRead]:
    return list_products_controller(db)


@router.get("/{product_id}", response_model=ProductRead)
def get_product(product_id: int, db: Session = Depends(get_db)) -> ProductRead:
    return get_product_controller(db, product_id)


@router.put("/{product_id}", response_model=ProductRead)
def update_product(
    product_id: int, payload: ProductUpdate, db: Session = Depends(get_db)
) -> ProductRead:
    return update_product_controller(db, product_id, payload)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db)) -> None:
    delete_product_controller(db, product_id)
