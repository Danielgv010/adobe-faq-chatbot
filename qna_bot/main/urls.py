from django.urls import path
from . import views

urlpatterns = [
    path('', views.qna_main, name='home'),
    path('ask', views.ask, name='ask'),
    path('get_data', views.get_data, name='get_data'),

]