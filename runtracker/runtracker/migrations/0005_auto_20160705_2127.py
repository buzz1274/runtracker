# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-05 21:27
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('runtracker', '0004_run_treadmill'),
    ]

    operations = [
        migrations.RenameField(
            model_name='run',
            old_name='distance',
            new_name='metres',
        ),
        migrations.RenameField(
            model_name='run',
            old_name='second',
            new_name='seconds',
        ),
    ]
