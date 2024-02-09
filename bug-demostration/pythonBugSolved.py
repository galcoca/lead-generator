def factorial(n):
    if n == 0:  # Fixed: Changed '=' to '==' for comparison
        return 1
    else:
        return n * factorial(n-1)

def fibonacci(n):
    if n <= 0:
        return []  # Fixed: Return empty list for non-positive n
    elif n == 1:
        return [0]  # Fixed: Return [0] for n = 1
    else:
        fib = [0, 1]  # Fixed: Initial values are [0, 1]
        for i in range(2, n):
            fib.append(fib[i-1] + fib[i-2])
        return fib

n = 5
print("Factorial of", n, ":", factorial(n))
print("Fibonacci sequence of", n, ":", fibonacci(n))