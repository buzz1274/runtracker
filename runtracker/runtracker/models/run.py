from __future__ import unicode_literals
from django.db import models


class Run(models.Model):
    """
    run model
    """
    people = (('', '-------'),
              ('david', 'David'),
              ('claire', 'Claire'))

    run_type = (('', '-------'),
                ('couch25k', 'Couch25K'),
                ('trail', 'Trail Running'),
                ('hike', 'Hike'),
                ('walk', 'Walk'))

    run_id = models.AutoField(primary_key=True)
    who = models.CharField(blank=False, null=False, default='',
                           choices=people, max_length=6)
    type = models.CharField(blank=False, null=False, default='',
                            choices=run_type, max_length=10)
    route = models.TextField(blank=False, null=False, default='')
    date =  models.DateField(null=False, blank=False)
    seconds = models.IntegerField(null=False, blank=False)
    metres = models.IntegerField(blank=False, null=False)
    run = models.BooleanField(blank=False, null=False, default=True)
    complete = models.BooleanField(blank=False, null=False, default=True)
    treadmill = models.BooleanField(blank=False, null=False, default=True)

    class Meta:
        db_table = 'run'
        ordering = ['date', 'run_id']

    def seconds_for_display(self):
        return self.complete

    def min_per_km(self):
        return (float(self.seconds) / 60) /\
               (float(self.metres) / 1000)

    def km_per_hr(self):
        return 60 / self.min_per_km()

    def five_k_time(self):
        return self.min_per_km() * 5 * 60
