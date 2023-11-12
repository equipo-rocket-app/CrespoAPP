from rest_framework.authtoken.views import ObtainAuthToken
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.authtoken.models import Token
from django.shortcuts import redirect
from rest_framework import status

from .serializers import (
    UserSerializer,
    BarrioSerializer,
    CalleSerializer,
    TipoReclamoSerializer,
    ReclamoUrgenciaSerializer,
    ReclamoSerializer,
    NuevoReclamoSerializer,
    NoticiaSerializer,
    ReclamosDashboardSerializer,
)
from .models import Usuario, Barrio, Calle, TipoReclamo, ReclamoUrgencia, Reclamo, Noticia


class BarrioListAPIView(ListAPIView):
    serializer_class = BarrioSerializer

    def get_queryset(self):
        return Barrio.objects.all()


class CalleListAPIView(ListAPIView):
    serializer_class = CalleSerializer

    def get_queryset(self):
        return Calle.objects.all()


class TipoReclamoListAPIView(ListAPIView):
    serializer_class = TipoReclamoSerializer

    def get_queryset(self):
        return TipoReclamo.objects.all()


class ReclamoUrgenciaListAPIView(ListAPIView):
    serializer_class = ReclamoUrgenciaSerializer

    def get_queryset(self):
        return ReclamoUrgencia.objects.all()


class ReclamoCreateAPIView(CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Reclamo.objects.all()
    serializer_class = NuevoReclamoSerializer


class ReclamoRetrieveAPIView(RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = ReclamoSerializer
    queryset = Reclamo.objects.filter()


class ReclamoUpdateAPIView(UpdateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = ReclamoSerializer
    queryset = Reclamo.objects.filter()


class UsuarioCreateAPIView(CreateAPIView):
    serializer_class = UserSerializer


class LogOutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = Token.objects.get(user=request.user)
        except Token.DoesNotExist:
            return Response(
                {"detail": "No se encontró un token para este usuario."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token.delete()

        return Response(
            {"detail": "Cierre de sesión exitoso."}, status=status.HTTP_200_OK
        )


class LogInView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        usuario = serializer.validated_data["user"]

        token, _ = Token.objects.get_or_create(user=usuario)

        usuario_data = Usuario.objects.get(id=usuario.pk)
        if usuario_data.user_area:
            user_area_id = usuario_data.user_area.id
        else:
            user_area_id = None

        response_data = {
            "token": token.key,
            "id": usuario.pk,
            "first_name": usuario.first_name,
            "last_name": usuario.last_name,
            "username": usuario.username,
            "is_superuser": usuario.is_superuser,
            "is_staff": usuario.is_staff,
            "user_area": user_area_id,
        }

        return Response(response_data, status=status.HTTP_200_OK)


class ReclamosByUserAPIView(ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = ReclamoSerializer

    def get_queryset(self, *args, **kwargs):
        user_id = self.kwargs.get("id")
        usuario = Usuario.objects.get(id=user_id)

        if usuario.user_area:
            return Reclamo.objects.filter(estado=2, tipo=usuario.user_area.id)

        if user_id:
            return Reclamo.objects.filter(usuario_creo=user_id).order_by("-fecha_creacion")
        return Reclamo.objects.all().order_by("-fecha_creacion")


class NoticiasListAPIView(ListAPIView):
    serializer_class = NoticiaSerializer

    def get_queryset(self):
        return Noticia.objects.all()[:5]


class ReclamosChartAPIView(ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = ReclamosDashboardSerializer

    def get_queryset(self):
        user_id = self.kwargs.get("id")

        if user_id:
            reclamos = Reclamo.objects.filter(usuario_creo=user_id)
            abiertos_count, en_proceso_count, cerrados_count = 0, 0, 0
            for reclamo in reclamos:
                if reclamo.estado == 1:
                    abiertos_count += 1
                if reclamo.estado == 2:
                    en_proceso_count += 1
                if reclamo.estado == 3:
                    cerrados_count += 1
            data = [
                {"value": abiertos_count, "label": "Abiertos"},
                {"value": en_proceso_count, "label": "En Proceso"},
                {"value": cerrados_count, "label": "Cerrados"},
            ]
            return data
