from pydantic import BaseModel, Field


class SendTextRequest(BaseModel):
    number: str = Field(min_length=1)
    text: str = Field(min_length=1)


class SendMediaRequest(BaseModel):
    number: str = Field(min_length=1)
    media_type: str = Field(pattern="^(image|document|video|audio)$")
    media: str = Field(min_length=1)
    caption: str | None = None
