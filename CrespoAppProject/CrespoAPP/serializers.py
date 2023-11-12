from rest_framework import serializers

from .models import (
    Usuario,
    Barrio,
    Calle,
    TipoReclamo,
    ReclamoUrgencia,
    Reclamo,
    Noticia,
)


class UserSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
    direccion_calle = serializers.CharField()
    direccion_nro = serializers.IntegerField()
    celular = serializers.IntegerField()

    def create(self, validate_data):
        instance = Usuario()
        instance.first_name = validate_data.get("first_name")
        instance.last_name = validate_data.get("last_name")
        instance.email = validate_data.get("email")
        instance.username = validate_data.get("email")
        instance.direccion_calle = validate_data.get("direccion_calle")
        instance.direccion_nro = validate_data.get("direccion_nro")
        instance.celular = validate_data.get("celular")
        instance.set_password(validate_data.get("password"))
        instance.save()

        return instance

    def validate_email(self, data):
        email = Usuario.objects.filter(email=data)

        if email:
            raise serializers.ValidationError(
                "El nombre de usuario ya esta en uso. Elija otro"
            )
        return data

    def validate_password(self, password):
        if len(password) < 7:
            raise serializers.ValidationError(
                "La contraseña debe contener mas de 7 Caracteres"
            )
        return password


class BarrioSerializer(serializers.ModelSerializer):
    value = serializers.CharField(source="nombre")

    class Meta:
        model = Barrio
        fields = ["id", "value"]


class CalleSerializer(serializers.ModelSerializer):
    value = serializers.CharField(source="nombre")

    class Meta:
        model = Calle
        fields = ["id", "value"]


class TipoReclamoSerializer(serializers.ModelSerializer):
    value = serializers.CharField(source="tipo")

    class Meta:
        model = TipoReclamo
        fields = ["id", "value"]


class ReclamoUrgenciaSerializer(serializers.ModelSerializer):
    value = serializers.CharField(source="descripcion")

    class Meta:
        model = ReclamoUrgencia
        fields = ["id", "value"]


class NuevoReclamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamo
        fields = (
            "tipo",
            "descripcion",
            "calle",
            "dir_nro",
            "inteserccion",
            "entre_calle_1",
            "entre_calle_2",
            "barrio",
            "latitud",
            "longitud",
            "urgencia",
            "usuario_creo",
            "imagen_reclamo",
        )


class ReclamoSerializer(serializers.ModelSerializer):
    tipo = serializers.StringRelatedField()
    calle = serializers.StringRelatedField()
    inteserccion = serializers.StringRelatedField()
    entre_calle_1 = serializers.StringRelatedField()
    entre_calle_2 = serializers.StringRelatedField()
    barrio = serializers.StringRelatedField()
    calificacion = serializers.IntegerField()
    urgencia = serializers.StringRelatedField()
    usuario_creo = serializers.StringRelatedField()
    fecha_creacion = serializers.DateTimeField(format="%d-%m-%Y")
    fecha_proceso = serializers.DateTimeField(format="%d-%m-%Y")
    fecha_finalizado = serializers.DateTimeField(format="%d-%m-%Y")

    class Meta:
        model = Reclamo
        fields = (
            "id",
            "tipo",
            "calle",
            "dir_nro",
            "inteserccion",
            "entre_calle_1",
            "entre_calle_2",
            "barrio",
            "latitud",
            "longitud",
            "calificacion",
            "comentario_calificacion",
            "fecha_creacion",
            "fecha_proceso",
            "fecha_finalizado",
            "estado",
            "urgencia",
            "usuario_creo",
            "comentario_reparacion",
            "descripcion",
            "imagen_reclamo",
            "imagen_reparacion",
        )


class NoticiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Noticia
        fields = "__all__"


class ReclamosDashboardSerializer(serializers.Serializer):
    value = serializers.IntegerField()
    label = serializers.CharField()
