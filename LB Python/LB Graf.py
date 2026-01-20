import networkx as nx
import itertools

# --- 1. Побудова графа ---
G = nx.Graph()
edges = [
    ('B','C'), ('C','D'), ('C','E'), ('C','A'),
    ('D','E'), ('E','H'), ('E','F'), ('E','A'),
    ('H','A'), ('H','F'), ('H','G'), ('G','F')
]
G.add_edges_from(edges)

# --- 2. Хроматичне число ---
def chromatic_number(G):
    nodes = list(G.nodes())
    for k in range(1, len(nodes)+1):
        for colors in itertools.product(range(k), repeat=len(nodes)):
            coloring = dict(zip(nodes, colors))
            if all(coloring[u] != coloring[v] for u,v in G.edges()):
                return k, coloring

# --- 3. Хроматичний клас ---
def chromatic_index(G):
    edges = list(G.edges())
    for k in range(1, len(edges)+1):
        for colors in itertools.product(range(k), repeat=len(edges)):
            coloring = dict(zip(edges, colors))
            ok = True
            for e1 in edges:
                for e2 in edges:
                    if e1 != e2 and set(e1) & set(e2) and coloring[e1] == coloring[e2]:
                        ok = False
                        break
                if not ok:
                    break
            if ok:
                return k, coloring

# --- 4. Обчислення ---
chi, vertex_colors = chromatic_number(G)
chi_p, edge_colors = chromatic_index(G)

# --- 5. Виведення ---
color_names_v = ['🟥 червоний', '🟩 зелений', '🟦 синій', '🟨 жовтий', '🟪 фіолетовий']
color_names_e = ['🔴', '🟢', '🔵', '🟣', '🟠']

print(f"Хроматичне число χ(G) = {chi}")
for v, c in vertex_colors.items():
    print(f"Вершина {v} → {color_names_v[c]}")

print(f"\nХроматичний клас χ′(G) = {chi_p}")
for e, c in edge_colors.items():
    print(f"Ребро {e} → {color_names_e[c]} колір")

input("\nНатисніть Enter, щоб завершити...")
