from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.authtoken.views import obtain_auth_token
from api.views import UserDetailAPI, BookingDelete

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('auth/', obtain_auth_token),  
    path('user/', UserDetailAPI.as_view()),  
    path('bookingdelete/<int:id>/', BookingDelete.as_view()),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
