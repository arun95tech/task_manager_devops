FROM python:3.14-slim

WORKDIR /app

COPY user_service/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY user_service/ .

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]