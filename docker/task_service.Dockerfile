FROM python:3.14-slim

WORKDIR /app

COPY task_service/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY task_service/ .

EXPOSE 8001

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8001"]