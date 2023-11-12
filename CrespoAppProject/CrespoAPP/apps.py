from django.apps import AppConfig


class CrespoappConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "CrespoAPP"

    def ready(self):
        import CrespoAPP.signals