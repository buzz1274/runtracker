from __future__ import unicode_literals
from django.db import models
from django.contrib import admin


class Run(models.Model):
    """
    run model
    """
    run_id = models.AutoField(primary_key=True)
    who = models.TextField(blank=False, null=False, default='')
    type = models.TextField(blank=False, null=False, default='')
    route = models.TextField(blank=False, null=False, default='')
    date =  models.DateField(null=False, blank=False)
    second = models.IntegerField(null=False, blank=False)
    distance = models.IntegerField(blank=False, null=False)
    complete = models.BooleanField(blank=False, null=False, default=True)


    class Meta:
        db_table = 'run'
        ordering = ['date', 'run_id']

    def duration(self, seconds = None):
        if seconds:
            seconds = int(seconds)
        else:
            seconds = int(self.second)

        return "%s:%s:%s" % (str(seconds / 3600).zfill(2),
                             str((seconds % 3600) / 60).zfill(2),
                             str((seconds % 3600) % 60).zfill(2) ,)

    def km(self):
        return "{0:.3f}".format(float(self.distance) / 1000)

    def min_per_km(self):
        return (float(self.second) / 60) /\
               (float(self.distance) / 1000)

    def five_k_time(self):
        return self.duration(self.min_per_km() * 5 * 60)

admin.site.register(Run)