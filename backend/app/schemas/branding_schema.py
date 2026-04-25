from pydantic import BaseModel, Field


class BrandingUpsert(BaseModel):
    company_name: str = Field(min_length=1, max_length=255)
    voice_tone: str = Field(min_length=1, max_length=255)
    primary_color: str = Field(min_length=1, max_length=32)
    ai_context: str = Field(min_length=1, max_length=2000)


class BrandingRead(BrandingUpsert):
    id: int

    model_config = {"from_attributes": True}
