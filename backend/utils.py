
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# def try_parse_chart_data(response: str):
#     """
#     Tries to extract chart data and infer chart type.
#     Returns (chart_data_dict, chart_type) or (None, None) if parsing fails.
#     """
#     import re

#     if not response or not isinstance(response, str):
#         return None, None

#     try:
#         # Match lines like: "- Item: 123" or "* Label: 45.6"
#         pattern = r"[-*]\s*(.+?):\s*(-?\d+(\.\d+)?)"
#         matches = re.findall(pattern, response)

#         if not matches:
#             return None, None

#         labels = []
#         values = []

#         for match in matches:
#             label = match[0].strip()
#             value = float(match[1])
#             labels.append(label)
#             values.append(value)

#         if not labels or not values:
#             return None, None

#         chart_data = {"labels": labels, "values": values}
#         chart_type = "bar"  # or you could infer type based on content or count

#         return chart_data, chart_type
#     except Exception as e:
#         print(f"Chart parsing failed: {e}")
#         return None, None



def try_parse_chart_data(response: str):
    """
    Tries to extract chart data and infer chart type.
    Returns (chart_data_dict, chart_type) or (None, None) if parsing fails.
    """
    import re

    try:
        # Updated pattern to handle optional bold formatting with **
        pattern = r"[-*]\s*\*{0,2}(.+?)\*{0,2}:\s*(\d+(\.\d+)?)"
        matches = re.findall(pattern, response)

        if not matches:
            return None, None

        labels = []
        values = []

        for match in matches:
            labels.append(match[0].strip())
            values.append(float(match[1]))

        chart_data = {"labels": labels, "values": values}
        chart_type = "bar"  # Change to "pie" if needed

        return chart_data, chart_type
    except Exception as e:
        print(f"Error parsing chart data: {e}")
        return None, None
