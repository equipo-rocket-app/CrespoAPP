from django.contrib import admin
from django.utils.html import format_html
from django.utils.dateformat import format
from django.utils.formats import get_format
from rangefilter.filters import DateRangeFilter
from django.utils.safestring import mark_safe

from .models import *

admin.site.register(Usuario)
admin.site.register(Barrio)
admin.site.register(Calle)
admin.site.register(Noticia)
# admin.site.register(Reclamo)
admin.site.register(ReclamoUrgencia)
admin.site.register(TipoReclamo)


class ReclamoAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'fecha_creacion_formatted',
        'urgencia',
        'estado',
        'usuario_creo',
        "usuario_telefono",
        'mostrar_direccion',
        'mostrar_imagen_reclamo',
        'mostrar_imagen_reparacion'
    )
    list_filter = ('tipo', 'urgencia', 'estado',
                   ('fecha_creacion', DateRangeFilter),)
    search_fields = ['id', 'usuario_creo__first_name',
                     'usuario_creo__last_name', "calle__nombre", "dir_nro"]
    readonly_fields = (
        'id',
        'tipo',
        'descripcion',
        "calle",
        "dir_nro",
        "inteserccion",
        "entre_calle_1",
        "entre_calle_2",
        "barrio",
        "ubicacion_gps",
        "calificacion",
        "comentario_calificacion",
        "fecha_creacion",
        "fecha_proceso",
        "fecha_finalizado",
        "usuario_creo",
        "imagen_reclamo_detalle",
        "imagen_reparacion_detalle",
    )
    exclude = ("imagen_reclamo", "latitud", "longitud", "imagen_reparacion")

    def fecha_creacion_formatted(self, obj):
        date_format = get_format('d/m/Y')
        return format(obj.fecha_creacion, date_format)
    fecha_creacion_formatted.short_description = 'Fecha de Creación'

    def mostrar_imagen_reclamo(self, obj):
        if obj.imagen_reclamo:
            return format_html(f'<img src="{obj.imagen_reclamo}" height="80" />')
        else:
            return "Sin imagen"
    mostrar_imagen_reclamo.short_description = 'Imagen del Reclamo'

    def imagen_reclamo_detalle(self, obj):
        if obj.imagen_reclamo:
            return format_html(f'<img src="{obj.imagen_reclamo}" height="400" />')
        else:
            return "Sin imagen"

    def mostrar_imagen_reparacion(self, obj):
        if obj.imagen_reparacion:
            return format_html(f'<img src="{obj.imagen_reparacion}" height="80" />')
        else:
            return "Sin imagen"
    mostrar_imagen_reparacion.short_description = 'Imagen del Reclamo'

    def imagen_reparacion_detalle(self, obj):
        if obj.imagen_reparacion:
            return format_html(f'<img src="{obj.imagen_reparacion}" height="400" />')
        else:
            return "Sin imagen"

    def mostrar_direccion(self, obj):
        return f"{obj.calle.nombre} {obj.dir_nro}"
    mostrar_direccion.short_description = 'Dirección'

    def usuario_telefono(self, obj):
        return obj.usuario_creo.celular
    usuario_telefono.short_description = 'Celular'

    def ubicacion_gps(self, obj):
        return mark_safe(f'<a href="https://www.google.com/maps?q={obj.latitud},{obj.longitud}" target="_blank"> Locacion GPS </a>')
    ubicacion_gps.allow_tags = True


admin.site.register(Reclamo, ReclamoAdmin)
