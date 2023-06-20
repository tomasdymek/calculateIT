from django.urls import path
from .views import home, result


urlpatterns = [
    path('', home, name='home'),
    path('result/<int:calculation_id>/', result, name='result'),
    # ... inne ścieżki dla widoków w aplikacji calculator
]