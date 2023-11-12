from django.db import models
from django.contrib.auth.models import User


class TipoReclamo(models.Model):
    tipo = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Tipo de Reclamo"
        verbose_name_plural = "Tipos de Reclamos"

    def __str__(self) -> str:
        return self.tipo


class Noticia(models.Model):
    titulo = models.CharField(max_length=200)
    link = models.URLField()
    imagen = models.ImageField(upload_to='noticias/')
    fecha = models.DateField()

    class Meta:
        verbose_name = "Noticia"
        verbose_name_plural = "Noticias"

    def __str__(self) -> str:
        return self.titulo[:30]


class ReclamoUrgencia(models.Model):
    descripcion = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.descripcion


class Calle(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.nombre


class Barrio(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.nombre


class Usuario(User):
    direccion_calle = models.CharField(max_length=50)
    direccion_nro = models.IntegerField()
    celular = models.IntegerField()
    user_area = models.ForeignKey(
        TipoReclamo, on_delete=models.CASCADE, related_name="usuario", blank=True, null=True, default=None)

    def __str__(self) -> str:
        return f"{self.first_name}, {self.last_name}"


class Reclamo(models.Model):
    tipo = models.ForeignKey(
        TipoReclamo, on_delete=models.CASCADE, related_name="tipo_reclamo"
    )
    calle = models.ForeignKey(
        Calle, on_delete=models.CASCADE, related_name="calle_reclamo"
    )
    dir_nro = models.IntegerField()
    inteserccion = models.ForeignKey(
        Calle,
        on_delete=models.CASCADE,
        related_name="interseccion_reclamo",
        blank=True,
        null=True,
    )
    entre_calle_1 = models.ForeignKey(
        Calle,
        on_delete=models.CASCADE,
        related_name="entre_calle_1_reclamo",
        blank=True,
        null=True,
    )
    entre_calle_2 = models.ForeignKey(
        Calle,
        on_delete=models.CASCADE,
        related_name="entre_calle_2_reclamo",
        blank=True,
        null=True,
    )
    barrio = models.ForeignKey(
        Barrio,
        on_delete=models.CASCADE,
        related_name="barrio_reclamo",
        blank=True,
        null=True,
    )
    latitud = models.CharField(max_length=20)
    longitud = models.CharField(max_length=20)
    calificacion = models.IntegerField(
        choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)],
        null=True,
        default=0,
        blank=True,
    )
    comentario_calificacion = models.CharField(
        max_length=150, null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_proceso = models.DateTimeField(null=True, blank=True)
    fecha_finalizado = models.DateTimeField(null=True, blank=True)
    estado = models.IntegerField(
        choices=[(1, "Abierto"), (2, "En Proceso"), (3, "Cerrado")], default=1
    )
    urgencia = models.ForeignKey(
        ReclamoUrgencia, on_delete=models.CASCADE, related_name="urgencia_reclamo"
    )
    usuario_creo = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name="reclamos_creados"
    )
    comentario_reparacion = models.CharField(
        max_length=300, null=True, blank=True)
    descripcion = models.CharField(max_length=300)

    imagen_reclamo = models.URLField(blank=True, null=True)
    imagen_reparacion = models.URLField(blank=True, null=True)
    # imagen_reparacion = models.ImageField(
    #     upload_to='reparaciones/', blank=True, null=True)

    def __str__(self) -> str:
        return self.descripcion
