from django.urls import path
from .views import EmailPasswordLoginView, GoogleLoginView, SignupView

urlpatterns = [
    path('login/', EmailPasswordLoginView.as_view(), name='email_password_login'),
    path('google/', GoogleLoginView.as_view(), name='google_login'),
    path('signup/', SignupView.as_view(), name='signup'),
]


