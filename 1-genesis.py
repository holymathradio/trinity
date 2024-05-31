# As published April 17 2023 : Of real numbers - 1 - Genesis
from manimlib import *


class CustomFunctionGraph(VMobject):
    """Custom VMobject to create a graph from a mathematical function within a given range."""

    def __init__(self, function, x_range=[-1, 1], **kwargs):
        super().__init__(**kwargs)
        self.function = function
        x_min, x_max, x_step = x_range

        # Create an array of x values based on the provided step and range
        if x_step > 0:
            x_values = np.arange(x_min, x_max + x_step, x_step)
        else:
            x_values = np.arange(x_max, x_min - x_step, -x_step)[::-1]

        # Create points in 3D space for the function
        points = [np.array([x, function(x), 0]) for x in x_values]
        self.set_points_smoothly(points)


class Genesis(Scene):
    """A scene for displaying the first 3 verses of Genesis along with animated graphics."""

    def construct(self):
        # Setup the axes with specific configurations
        axes = Axes(
            x_range=(-10, 10, 5),
            height=6,
            width=10,
            axis_config={
                "stroke_color": GREY_A,
                "stroke_width": 2,
                "include_tip": True
            },
            y_axis_config={
                "include_tip": False,
                "stroke_color": BLACK
            }
        )

        # Add coordinate labels to the axes
        axes.add_coordinate_labels(
            font_size=20,
            num_decimal_places=0,
        )

        # Create and animate introduction text
        text0 = Text(
            "Genesis",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"God": YELLOW, "words": GREEN}
        )

        self.play(Write(text0, run_time=0.01))
        self.wait(5)
        self.play(FadeOut(text0, run_time=0.01))

        # Display sequential verses with dramatic effect
        text = Text(
            "1:1 In the beginning God created the heavens and the earth.",
            font="Arial",
            t2f={"font": "Consolas", "words": "Consolas"},
            t2c={"God": YELLOW, "words": GREEN}
        )
        self.wait(3)
        self.play(Write(text, run_time=4))
        self.wait(5)
        self.play(FadeOut(text))

        gen12 = Text(
            "1:2 Now the earth was formless and empty, \ndarkness was over the surface of the deep, \nand the Spirit of God was hovering over the waters.",
            font="Arial",
            t2c={"God": YELLOW, "Spirit": BLUE, "waters": GREY}
        )
        gen12.set_width(FRAME_WIDTH - 1)
        self.play(Write(gen12, run_time=8))
        self.play(gen12.animate.to_edge(UP))
        self.wait(4)

        # Animate a dot moving across the axes
        dot = Dot(color='#808080').move_to(axes.c2p(-9, 0))
        self.play(FadeIn(dot, scale=0.5))
        self.play(dot.animate.move_to(axes.c2p(0, 0)), FadeOut(gen12, UP), run_time=15)

        gen13 = Text(
            "1:3 And God said, \"Let there be light\", and there was light.",
            font="Arial",
            t2c={"God": YELLOW, "\"Let there be light\"": YELLOW, "light": YELLOW}
        )
        self.play(Write(gen13.to_edge(UP), run_time=6))

        # Dot expands into a ray of light on the right
        dot2 = Dot(color='#808080')
        dot2.move_to(axes.c2p(100, 0))
        line_ray = Line(dot, dot2, color=YELLOW)
        dot_rest = Dot(color='#808080', opacity=1)
        dot_rest.move_to(axes.c2p(0, 0))
        self.play(AnimationGroup(FadeOut(dot, scale=1000), FadeIn(line_ray), FadeIn(dot_rest)), lag_ratio=0.5, run_time=15)

        # Introduce a NumberLine and align it with the axes
        l0 = NumberLine(x_range=[-10, 10, 1], include_numbers=True)
        l0_center = (l0.get_start() + l0.get_end()) / 2
        l0_shift = axes.get_center() - l0_center
        l0.shift(l0_shift)

        # Align the dot's center with the axes center
        axes_center = axes.get_center()
        dotrest_center = dot_rest.get_center()
        dot_rest.shift(axes_center - dotrest_center)


        # Fade in the number line to the scene
        self.play(FadeIn(l0))
        self.wait(5)

        # Define styles for text to be displayed
        font = "DejaVu Sans"
        font_config = {"stretch": True}  # This config is defined but not used in this snippet

        # Define the positive and negative signs as text objects
        text_plus = Text("+", color=YELLOW)
        text_minus = Text("-", color=WHITE, font_size=68)

        # Get the coordinates for placement of the signs
        point_plus = l0.number_to_point(1.5)
        point_minus = l0.number_to_point(-1.5)

        # Place the texts at the calculated positions
        text_plus.move_to(point_plus)
        text_minus.move_to(point_minus)

        # Define the curves along which the text will move
        curve_plus = FunctionGraph(lambda x: ((x - point_plus[0]) / 1.5) ** 2 + point_plus[1], x_range=[point_plus[0], point_plus[0] + 2, 0.1], color=WHITE)
        curve_minus = CustomFunctionGraph(lambda x: ((x - point_minus[0]) / 1.5) ** 2 + point_minus[1], x_range=[point_minus[0], point_minus[0] - 2, -0.1], color=WHITE)

        # Function to scale text during animation
        def scale_text(text_obj):
            text_obj.scale(1.013)

        # Animate the movement of the signs along the defined curves and scale them simultaneously
        self.play(
            MoveAlongPath(text_plus, curve_plus, rate_func=linear),
            MoveAlongPath(text_minus, curve_minus, rate_func=linear),
            UpdateFromFunc(text_plus, scale_text),
            UpdateFromFunc(text_minus, scale_text),
            run_time=2
        )

        self.wait(2)

        # Display the final verse with specific text coloring
        gen13_final = Text(
            "1:3 And in one Lord Jesus Christ, the only Son of God, begotten from the Father before all ages, God from God, Light from Light, true God from true God,",
            font="Arial",
            t2c={"Let there be light": YELLOW, "light": YELLOW}
        )
        self.wait(8)