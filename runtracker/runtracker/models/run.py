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
    seconds = models.IntegerField(null=False, blank=False)
    metres = models.IntegerField(blank=False, null=False)
    complete = models.BooleanField(blank=False, null=False, default=True)
    treadmill = models.BooleanField(blank=False, null=False, default=True)


    class Meta:
        db_table = 'run'
        ordering = ['date', 'run_id']

    def min_per_km(self):
        return (float(self.seconds) / 60) /\
               (float(self.metres) / 1000)

    def five_k_time(self):
        return self.min_per_km() * 5 * 60

admin.site.register(Run)