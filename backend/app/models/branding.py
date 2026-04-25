from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.session import Base


class Branding(Base):
    __tablename__ = "branding"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    company_name: Mapped[str] = mapped_column(String(255), nullable=False)
    voice_tone: Mapped[str] = mapped_column(String(255), nullable=False)
    primary_color: Mapped[str] = mapped_column(String(32), nullable=False)
    ai_context: Mapped[str] = mapped_column(String(2000), nullable=False)
