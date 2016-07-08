from django.contrib import admin
from django import forms
from models.run import Run
import re


class RunAdminForm(forms.ModelForm):

    time = forms.CharField()

@admin.register(Run)
class RunAdmin(admin.ModelAdmin):
    form = RunAdminForm
    fields = ['who', 'type', 'route', 'date', 'time',
              'metres', 'run', 'treadmill', 'complete']
    list_display = ('who', 'date', 'run', 'treadmill', 'type', 'route',
                    'duration', 'distance', 'complete',)

    def get_form(self, request, obj=None, **kwargs):
        form = super(RunAdmin, self).get_form(request, obj, **kwargs)

        if obj:
            form.declared_fields['time'].initial = \
                self.format_duration(int(obj.seconds))

        return form

    def save_model(self, request, obj, form, change):

        obj.seconds = form.cleaned_data['time']

        if re.search(':', obj.seconds):
            multiplier = [1, 60, 3600]
            values = obj.seconds.split(":")[::-1]
            obj.seconds = 0

            for i in range(0, len(values)):
                try:
                    obj.seconds += int(values[i]) * multiplier[i]
                except ValueError:
                    obj.seconds += 0

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

        return self.format_duration(seconds)

    def distance(self, obj):
        return "{0:.3f}".format(float(obj.metres) / 1000)


    def format_duration(self, seconds):
        return "%s:%s:%s" % (str(seconds / 3600).zfill(2),
                             str((seconds % 3600) / 60).zfill(2),
                             str((seconds % 3600) % 60).zfill(2),)
