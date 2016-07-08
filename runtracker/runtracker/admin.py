from django.contrib import admin
from models.run import Run
import re

@admin.register(Run)
class RunAdmin(admin.ModelAdmin):
    list_display = ('who', 'date', 'run', 'treadmill', 'type', 'route',
                    'duration', 'distance', 'complete')

    def save_model(self, request, obj, form, change):
        if re.search(':', obj.seconds):
            multiplier = [1, 60, 3600]
            values = obj.seconds.split(":")[::-1]
            seconds = 0

            for i in range(0, len(values)):
                try:
                    seconds += int(values[i]) * multiplier[i]
                except ValueError:
                    seconds += 0

            obj.seconds = seconds

        else:
            try:
                obj.seconds = int(obj.seconds)
            except ValueError:
                obj.seconds = 0

        super(RunAdmin, self).save_formset(request, obj, form, change)

    def duration(self, obj):
        try:
            seconds = int(obj.seconds)
        except ValueError:
            seconds = 0

        return "%s:%s:%s" % (str(seconds / 3600).zfill(2),
                             str((seconds % 3600) / 60).zfill(2),
                             str((seconds % 3600) % 60).zfill(2),)

    def distance(self, obj):
        return "{0:.3f}".format(float(obj.metres) / 1000)