import os

from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
# from tempfile import mkdtemp
# from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
# db = SQL("sqlite:///finance.db")

# # Make sure API key is set
# if not os.environ.get("API_KEY"):
#     raise RuntimeError("API_KEY not set")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    # stocks = db.execute("SELECT * FROM stocks WHERE user_id = ?", session["user_id"])
    # if len(stocks) > 0:
    #     for stock in stocks:
    #         price = lookup(stock["symbol"])["price"]
    #         db.execute("UPDATE stocks SET price = ?, total_value = ? WHERE user_id = ? AND symbol = ?",
    #                     price, price*stock["quantity"], session["user_id"], stock["symbol"])
    # updatedStocks = db.execute("SELECT * FROM stocks WHERE user_id = ? AND quantity != 0", session["user_id"])
    # balance = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])[0]["cash"]
    # total = db.execute("SELECT sum(total_value) as total FROM stocks WHERE user_id = ?", session["user_id"])[0]["total"]
    # if not balance:
    #     balance = 0
    # if not total:
    #     total = 0

    return render_template("index.html", stocks=updatedStocks, balance=balance, stockstotal=total)


# @app.route("/buy", methods=["GET", "POST"])
# @login_required
# def buy():
#     """Buy shares of stock"""
#     if request.method == "POST":
#         symbol = request.form.get("symbol")
#         if not symbol:
#             return apology("Blank ticker symbol", 400)
#         stock = lookup(symbol)
#         if not stock:
#             return apology("Invalid ticker symbol", 400)
#         try:
#             shares = int(request.form.get("shares"))
#         except:
#             return apology("Shares quantity must be a positive integer number.", 400)
#         if shares <= 0:
#             return apology("Shares quantity must be a positive integer number.", 400)

#         totalValue = shares*stock['price']
#         userBalance = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])[0]['cash']
#         if totalValue > userBalance:
#             return apology("Insufficient balance.", 400)
#         else:
#             db.execute("UPDATE users SET cash = ? WHERE id = ?", userBalance - totalValue, session["user_id"])
#             db.execute("INSERT INTO transactions (user_id, stock_symbol, quantity, price) VALUES(?, ?, ?, ?)",
#                         session["user_id"], symbol, shares, stock['price'])
#             ownedQuantity = db.execute("SELECT quantity FROM stocks WHERE user_id = ? AND symbol = ?", session["user_id"], symbol)
#             if len(ownedQuantity) == 1:
#                 db.execute("UPDATE stocks SET quantity = ? WHERE user_id = ? AND symbol = ?",
#                             ownedQuantity[0]['quantity'] + shares, session["user_id"], symbol)
#             else:
#                 db.execute("INSERT INTO stocks (user_id, symbol, quantity, price) VALUES(?, ?, ?, ?)",
#                             session["user_id"], symbol, shares, stock['price'])

#         return redirect("/")
#     else:
#         return render_template("buy.html")


# @app.route("/history")
# @login_required
# def history():
#     """Show history of transactions"""
#     transactions = db.execute("SELECT * FROM transactions WHERE user_id = ?", session["user_id"])

#     return render_template("history.html", transactions=transactions)


@app.route("/login", methods=["GET", "POST"])
def login():
#     """Log user in"""

#     # Forget any user_id
#     session.clear()

#     # User reached route via POST (as by submitting a form via POST)
#     if request.method == "POST":

#         # Ensure username was submitted
#         if not request.form.get("username"):
#             return apology("must provide username", 403)

#         # Ensure password was submitted
#         elif not request.form.get("password"):
#             return apology("must provide password", 403)

#         # Query database for username
#         rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

#         # Ensure username exists and password is correct
#         if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
#             return apology("invalid username and/or password", 403)

#         # Remember which user has logged in
#         session["user_id"] = rows[0]["id"]

#         # Redirect user to home page
#         return redirect("/")

#     # User reached route via GET (as by clicking a link or via redirect)
#     else:
    return render_template("login.html")


# @app.route("/logout")
# def logout():
#     """Log user out"""

#     # Forget any user_id
#     session.clear()

#     # Redirect user to login form
#     return redirect("/")


# @app.route("/quote", methods=["GET", "POST"])
# @login_required
# def quote():
#     """Get stock quote."""
#     if request.method == "POST":
#         symbol = request.form.get("symbol")
#         if not symbol:
#             return apology("Invalid ticker symbol", 400)
#         stock = lookup(symbol)
#         if not stock:
#             return apology("Invalid ticker symbol", 400)
#         return render_template("quoted.html", stock=stock)

#     return render_template("quote.html")


# @app.route("/register", methods=["GET", "POST"])
# def register():
#     """Register user"""
#     # User reached route via POST (as by submitting a form via POST)
#     if request.method == "POST":
#         # Ensure username was submitted
#         if not request.form.get("username"):
#             return apology("must provide username", 400)
#         # Ensure password was submitted
#         elif not request.form.get("password"):
#             return apology("must provide password", 400)
#         elif not request.form.get("confirmation"):
#             return apology("must provide a confirmation password", 400)
#         else:
#             username = request.form.get("username")
#             existingUsername = db.execute("SELECT username FROM users WHERE username = ?", username)
#             if len(existingUsername) != 0:
#                 return apology("Username already in use", 400)
#             password = request.form.get("password")
#             confirmation = request.form.get("confirmation")
#             if password != confirmation:
#                 return apology("password confirmation failed", 400)
#             db.execute("INSERT INTO users (username, hash) VALUES(?, ?)", username, generate_password_hash(password) )

#         return redirect("/")
#     else:
#         return render_template("register.html")


# @app.route("/sell", methods=["GET", "POST"])
# @login_required
# def sell():
#     """Sell shares of stock"""
#     if request.method == "POST":
#         symbol = request.form.get("symbol")
#         stock = lookup(symbol)
#         if not stock:
#             return apology("stock not valid", 403)

#         try:
#             shares = int(request.form.get("shares"))
#         except:
#             return apology("Shares quantity must be a positive integer number", 400)

#         owned = db.execute("SELECT quantity FROM stocks WHERE user_id = ? AND symbol = ?", session["user_id"], symbol)
#         if shares <= 0:
#             return apology("Shares quantity must be a positive integer number", 400)
#         elif len(owned) != 1:
#             return apology("Does not own any shares of given stock", 400)
#         elif owned[0]['quantity'] < shares:
#             return apology("Cannot sell more shares than owned", 400)

#         ownedQuantity = owned[0]['quantity']
#         totalValue = shares*stock['price']
#         userBalance = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])[0]['cash']

#         db.execute("UPDATE users SET cash = ? WHERE id = ?", userBalance + totalValue, session["user_id"])
#         db.execute("INSERT INTO transactions (user_id, stock_symbol, quantity, price) VALUES(?, ?, ?, ?)",
#                     session["user_id"], symbol, -shares, stock['price'])
#         db.execute("UPDATE stocks SET quantity = ? WHERE user_id = ? AND symbol = ?",
#                     ownedQuantity - shares, session["user_id"], symbol)

#         return redirect("/")
#     else:
#         ownedStocks = db.execute("SELECT symbol, quantity FROM stocks WHERE user_id = ? GROUP BY symbol", session["user_id"])
#         return render_template("sell.html", stocks=ownedStocks)


# @app.route("/operation", methods=["POST"])
# @login_required
# def operation():
#     operation = request.form.get('operation')
#     return redirect('/' + operation, code=307)

# #    shares = int(request.form.get('quantity'))
# #    symbol = request.form.get('symbol')

# #    dictToSend = {'symbol': symbol, 'shares': shares}