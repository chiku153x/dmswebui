import os
import sys
prop = sys.argv[1]
envs = os.environ

lsn = None
with open(prop) as f:
	lns = f.read().splitlines()


with open(prop, "w") as out:
	for ln in lns:
		if "$V_" in ln:
			clean_prop_ln = ln.replace("$V_", "").replace("__", "")
			added = False
			for env in envs:
				if env in '"'+clean_prop_ln.split("=")[1].strip()+'"':
					val = clean_prop_ln.replace(env, os.environ.get(env))
					out.write(val + "\n")
					added = True
					break
			if not added:
				out.write(ln + "\n")
		else:
			out.write(ln + "\n")