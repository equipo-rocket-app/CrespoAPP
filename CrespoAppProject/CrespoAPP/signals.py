from django.db.models.signals import pre_save
from django.utils import timezone
from django.dispatch import receiver

from .models import Reclamo


@receiver(pre_save, sender=Reclamo)
def actualizar_fecha_hora_de_cambio(sender, instance, **kwargs):
    if instance.estado == 2:
        instance.fecha_proceso = timezone.now()
    if instance.estado == 3:
        instance.fecha_finalizado = timezone.now()
