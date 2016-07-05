from django.shortcuts import render_to_response
from django.template import RequestContext
from ..models.run import Run

def index(request):
    """
    index
    """
    runs = Run.objects.all()


    return render_to_response('index.html', {'runs': runs},
                              RequestContext(request))