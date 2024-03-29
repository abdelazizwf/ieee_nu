from dj_rest_auth.registration.views import VerifyEmailView
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r'all-profiles', AdminProfileDetails)

urlpatterns = [
    path('profile/', ProfileDetail.as_view(), name='profile-detail'),
    path('', include('dj_rest_auth.urls')),
    path('register/', include('dj_rest_auth.registration.urls')),
    path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(),
         name='account_email_verification_sent'),
    path('accounts/', include('allauth.urls')),
    path('password-reset/<uidb64>/<token>/',
         empty_view, name='password_reset_confirm'),
]

urlpatterns += router.urls
