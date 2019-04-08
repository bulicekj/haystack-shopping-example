.PHONY: build-frontend build-backend build

# docker namespace
export FRONT_END_IMAGE := shopping-frontend
export BACK_END_IMAGE := shopping-backend

build-frontend:
	docker build -t $(FRONT_END_IMAGE) -f shopping-frontend/Dockerfile ./shopping-frontend

build-backend:
	docker build -t $(BACK_END_IMAGE) -f shopping-backend/Dockerfile ./shopping-backend

build: build-frontend build-backend
