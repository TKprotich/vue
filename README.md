# vue
Practicing Vue js
There are a few difference between tracebacks output when executing your code in the command-line and running code in the REPL, below is the same code from the previous section executed in an `REPL` and the resulting traceback output.

\```pycon
>>> def greet( someone ):
>>>
...   print('Hello, ' +someon)
... 
>>> greet("Chad")

Traceback (most recent call last):
  File "", line 1, in 
  File "", line 2, in greet
NameError: name 'someon' is not defined
```
