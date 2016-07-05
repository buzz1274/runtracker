from django.shortcuts import render_to_response
from django.template import RequestContext
from django.db.models import F, Sum
from ..models.run import Run

def index(request):
    """
    index
    """
    runs = Run.objects.all()
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

    return render_to_response('index.html',
                              {'runs': runs,
                               'total_distance': total_distance,
                               'total_time': total_time},
                              RequestContext(request))