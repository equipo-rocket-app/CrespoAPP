from django.urls import path
from .views import (
    LogOutView,
    LogInView,
    UsuarioCreateAPIView,
    ReclamoCreateAPIView,
    ReclamoRetrieveAPIView,
    ReclamoUpdateAPIView,
    TipoReclamoListAPIView,
    ReclamoUrgenciaListAPIView,
    CalleListAPIView,
    BarrioListAPIView,
    ReclamosByUserAPIView,
    NoticiasListAPIView,
    ReclamosChartAPIView,
)


app_name = "crespo_app"

urlpatterns = [
    path("logout/", LogOutView.as_view(), name="logout"),
    path("login/", LogInView.as_view(), name="login"),
    path("usuarios/nuevo/", UsuarioCreateAPIView.as_view(), name="nuevo_usuario"),
    path(
        "reclamos/nuevo/",
        ReclamoCreateAPIView.as_view(),
        name="nuevo_reclamo",
    ),
    path(
        "reclamos/update/<pk>",
        ReclamoUpdateAPIView.as_view(),
        name="actualizar_reclamo",
    ),
    path(
        "reclamos/tipos/",
        TipoReclamoListAPIView.as_view(),
        name="listar_tipos_reclamos",
    ),
    path(
        "reclamos/urgencias/",
        ReclamoUrgenciaListAPIView.as_view(),
        name="listar_urgencias_reclamo",
    ),
    path("barrios/", BarrioListAPIView.as_view(), name="listar_barrios"),
    path("calles/", CalleListAPIView.as_view(), name="listar_calles"),
    path("reclamo/<pk>/", ReclamoRetrieveAPIView.as_view(), name="detalle_reclamo"),
    path(
        "reclamos/user/<id>/",
        ReclamosByUserAPIView.as_view(),
        name="listar_reclamos_de_usuario",
    ),
    path("noticias/", NoticiasListAPIView.as_view(), name="noticias"),
    path("reclamo/chart/<id>/", ReclamosChartAPIView.as_view(),
         name="reclamos_chart"),
]
