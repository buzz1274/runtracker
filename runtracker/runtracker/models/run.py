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


    class Meta:
        db_table = 'run'

    def duration(self):
        return "%s:%s:%s" % (str(self.second / 3600).zfill(2),
                             str((self.second % 3600) / 60).zfill(2),
                             str((self.second % 3600) % 60).zfill(2) ,)

    def km(self):
        return "{0:.3f}".format(float(self.distance) / 1000)

admin.site.register(Run)