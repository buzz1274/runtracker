from django.shortcuts import render_to_response
from django.template import RequestContext
from django.db.models import F, Sum
from ..models.run import Run
from datetime import datetime
from datetime import date
import dateutil.relativedelta

def index(request, who=None):
    """
    index
    """
    runs = Run.objects.all().filter()
    run = int(request.GET.get('run', 0))
    month = request.GET.get('month', False)
    year = request.GET.get('year', False)
    now = datetime.now()

    if month and year:
        try:
            results_date = date(int(year), int(month), 1)
        except ValueError:
            year = False
            month = False

    if who:
        runs = runs.filter(who=who)

    if not month or not year:
        results_date = datetime.now()
        year = now.year
        month = now.month

    longest_runs = runs.filter(run=True,
                               date__year__gte=2016).order_by('-metres')[:5]
    fastest_runs = runs.filter(run=True,
                               date__year__gte=2016).\
                        annotate(speed=1.0*F('metres') / F('seconds')).\
                        order_by('-speed')[:5]

    runs = runs.filter(date__year__gte=year,
                       date__month__gte=month,
                       date__year__lte=year,
                       date__month__lte=month)

    if run:
        runs = runs.filter(run=True)

    previous_date = results_date + dateutil.relativedelta.relativedelta(months=-1)
    next_date = results_date + dateutil.relativedelta.relativedelta(months=+1)
    total_distance = runs.aggregate(total_distance=Sum(F('metres')))
    total_time = runs.aggregate(total_time=Sum(F('seconds')))

    if total_distance:
        total_distance = total_distance['total_distance']
    else:
        total_distance = 0

    if total_time:
        total_time = total_time['total_time']
    else:
        total_time = 0

    if total_distance and total_time:
        average_pace = float(total_time) / \
                       (float(total_distance) / 1000)
        average_5k = average_pace * 5
        average_km_per_hr =  60 / (average_pace / 60)
        average_time = total_time / len(runs)
        average_distance = total_distance / len(runs)
        average_pace = float(total_time) / \
                       (float(total_distance) / 1000)

    else:
        average_pace = 0
        average_5k = 0
        average_km_per_hr = 0

    return render_to_response('index.html',
                              {'who': who,
                               'average_time': average_time,
                               'longest_runs': longest_runs,
                               'fastest_runs': fastest_runs,
                               'average_distance': average_distance,
                               'previous_year': previous_date.year,
                               'previous_month': previous_date.month,
                               'next_month': next_date.month,
                               'next_year': next_date.year,
                               'run': run,
                               'runs': runs,
                               'total_distance': total_distance,
                               'total_time': total_time,
                               'average_pace': average_pace,
                               'average_km_per_hr': average_km_per_hr,
                               'average_5k': average_5k},
                              RequestContext(request))