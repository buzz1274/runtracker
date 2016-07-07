from django.contrib import admin
from models.run import Run


@admin.register(Run)
class RunAdmin(admin.ModelAdmin):
    list_display = ('who', 'run', 'treadmill', 'type', 'route', 'date',
                    'duration', 'distance', 'complete')

    def duration(self, obj):
        return "%s:%s:%s" % (str(obj.seconds / 3600).zfill(2),
                             str((obj.seconds % 3600) / 60).zfill(2),
                             str((obj.seconds % 3600) % 60).zfill(2),)

    def distance(self, obj):
        return "{0:.3f}".format(float(obj.metres) / 1000)