from sqlalchemy import inspect


def object_as_dict(obj, exclude=[]):
    """ Generate dict from database row object """
    return_object = {}
    for c in inspect(obj).mapper.column_attrs:
        if c.key not in exclude:
            return_object[c.key] = getattr(obj, c.key)
    return return_object
