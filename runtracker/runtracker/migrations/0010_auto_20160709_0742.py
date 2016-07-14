# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-09 07:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('runtracker', '0009_auto_20160708_1841'),
    ]

    operations = [
        migrations.AlterField(
            model_name='run',
            name='type',
            field=models.CharField(choices=[('', '-------'), ('couch25k', 'Couch25K'), ('trail', 'Trail Running'), ('hike', 'Hike'), ('walk', 'Walk')], default='', max_length=10),
        ),
    ]