from django.conf.urls import include, url
from django.contrib import admin
from views import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^admin/', include(admin.site.urls)),
]
