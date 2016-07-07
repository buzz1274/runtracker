from django.shortcuts import render_to_response
from django.template import RequestContext
from django.db.models import F, Sum
from ..models.run import Run

def index(request):
    """
    index
    """
    year="2016"
    month="07"
    runs = Run.objects.all().filter(run=True,
                                    date__year__gte=year,
                                    date__month__gte=month,
                                    date__year__lte=year,
                                    date__month__lte=month)
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
        average_pace = (float(total_time) / 60) / \
                       (float(total_distance) / 1000)
        average_5k = average_pace * 5 * 60
    else:
        average_pace = 0
        average_5k = 0

    return render_to_response('index.html',
                              {'runs': runs,
                               'total_distance': total_distance,
                               'total_time': total_time,
                               'average_pace': average_pace,
                               'average_5k': average_5k},
                              RequestContext(request))