# Capstone 2: CMRP (Course Market/Review Platform)

## App Technical Information

CMRP is developed with ReactJS, nodejs.

## How to use (Cách cài đặt):

### Ứng dụng gồm có 3 folder (frontend, backend, rating-comment)

1. Trong folder (frontend, backend), hãy thực thi lệnh `npm install` để cài đặt node_modules
2. Trong folder (rating-comment), hãy thực thi lệnh:

```
python -m venv .env
.env/Scripts/activate
pip install flask flask_ngrok2 flask_cors torch transformers
```

3. Để demo `frontend` thì vào folder `frontend` chạy lệnh `npm run dev` chạy ở `http://localhost:5173`
4. Để demo `backend` thì vào folder `backend` chạy lệnh `npm run start` chạy ở `http://localhost:8080`
5. Để demo `rating-comment` thì vào folder `rating-comment` chạy lệnh `python app.py` chạy ở `http://localhost:5000/rating-comment`

## Config file (Để vào trong server/config/config.env)

```
MONGO_URI =
PORT =
JWT_SECRET =
JWT_COOKIE_EXPIRE =
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =
CLOUDINARY_CLOUD_NAME =
CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =
```

### Source: https://github.com/fumodayo/CMRP
