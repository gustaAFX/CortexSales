from fastapi import FastAPI

from app.api.routes.agents import router as agents_router
from app.api.routes.branding import router as branding_router
from app.api.routes.health import router as health_router
from app.api.routes.products import router as products_router
from app.api.routes.whatsapp import router as whatsapp_router
from app.database.session import Base, engine
from app.models import Branding, Product  # noqa: F401

app = FastAPI(title="CortexSales API")
app.include_router(health_router)
app.include_router(products_router)
app.include_router(branding_router)
app.include_router(whatsapp_router)
app.include_router(agents_router)


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
