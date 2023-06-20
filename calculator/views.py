from django.shortcuts import render, redirect
from .models import Calculation


def home(request):
    if request.method == 'POST':
        expression = request.POST.get('expression', '')
        try:
            result = eval(expression)
        except (SyntaxError, ZeroDivisionError):
            result = 'Błąd'

        calculation = Calculation(expression=expression, result=result)
        calculation.save()

        return redirect('result', calculation_id=calculation.id)

    return render(request, 'home.html')

def result(request, calculation_id):
    calculation = Calculation.objects.get(id=calculation_id)
    return render(request, 'result.html', {'calculation': calculation})
