from django import template

register = template.Library()

@register.filter(name='convert_seconds')
def convert_seconds(seconds):
    seconds = int(seconds)

    return "%s:%s:%s" % (str(seconds / 3600).zfill(2),
                         str((seconds % 3600) / 60).zfill(2),
                         str((seconds % 3600) % 60).zfill(2),)

@register.filter(name='convert_metres')
def convert_metres(metres):
    return "{0:.3f}".format(float(metres) / 1000)

@register.filter(name='two_decimals')
def two_decimals(number):
    return "{0:.2f}".format(number)