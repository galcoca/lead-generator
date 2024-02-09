def factorial(n):
    if n = 0:  # Bug: Should use '==' instead of '=' for comparison
        return 1
    else:
        return n * factorial(n-1)

def fibonacci(n):
    if n <= 0:  # Bug: Should include the case when n is 0
        return []
    elif n == 1:  # Bug: Should return [0] when n is 1
        return [1]  # Bug: Should return [0] instead of [1] when n is 1
    else:
        fib = [0, 1]  # Bug: Initial values should be [0, 1] instead of [1, 1]
        for i in range(2, n):
            fib.append(fib[i-1] + fib[i-2])
        return fib

n = 5
print("Factorial of", n, ":", factorial(n))
print("Fibonacci sequence of", n, ":", fibonacci(n))